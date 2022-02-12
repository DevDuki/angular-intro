import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../../shared/services/recipe.service';
import { Ingridient } from '../../../shared/models/ingridient.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup;
  id!: number;
  editMode: boolean = false;
  routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((updatedParams: Params) => {
      this.id = updatedParams['id'];
      this.editMode = updatedParams['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    let initialRecipe = {
      name: '',
      imagePath: '',
      description: '',
      ingridients: new FormArray([])
    }

    if (this.editMode) {
      const editingRecipe = this.recipeService.getRecipe(this.id);

      const editingIngridients = new FormArray([])

      if (editingRecipe.ingridients) {
        editingRecipe.ingridients.forEach((ingr: Ingridient) => {
          editingIngridients.push(
            new FormGroup({
              'name': new FormControl(ingr.name, Validators.required),
              'amount': new FormControl(ingr.amount,
                [Validators.required, Validators.min(1)]),
            })
          )
        })
      }

      initialRecipe = {
        ...editingRecipe,
        ingridients: editingIngridients
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(initialRecipe.name, Validators.required),
      'imagePath': new FormControl(initialRecipe.imagePath, Validators.required),
      'description': new FormControl(initialRecipe.description, Validators.required),
      'ingridients': initialRecipe.ingridients
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  addRecipe() {
    if (this.editMode) {
      this.recipeForm.value.id = this.id
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.id = this.recipeService.getNextId()
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['/recipes', this.id])
  }

  getIngridientControls() {
    return (<FormArray>this.recipeForm.get('ingridients')).controls
  }

  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    )
  }

  onDeleteIngridient(index: number) {
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
}
