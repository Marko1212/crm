import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  template: `<div class="container">
    <form [formGroup]="recipe" (submit)="onSubmit()">
      <input
        required
        minlength="10"
        formControlName="title"
        [class.is-invalid]="title.touched && title.invalid"
        [class.is-valid]="title.touched && title.valid"
        type="text"
        class="form-control mb-2"
        placeholder="Titre de votre recette"
      />
      <h3>
        Les ingrédients
        <button
          (click)="addIngredient()"
          class="btn btn-primary btn-sm"
          type="button"
        >
          + Ajouter
        </button>
      </h3>

      <div class="alert bg-info" *ngIf="ingredients.controls.length === 0">
        Vous n'avez pas ajouté d'ingrédient(s), cliquez sur le bouton ci-dessus
      </div>
      <div
        class="row"
        *ngFor="let group of ingredients.controls; let i = index"
        [formGroup]="group"
      >
        <div class="col">
          <input
            required
            minlength="5"
            [class.is-invalid]="
              group.controls.name.touched && group.controls.name.invalid
            "
            [class.is-valid]="
              group.controls.name.touched && group.controls.name.valid
            "
            type="text"
            class="form-control mb-2"
            placeholder="Nom de l'ingrédient"
            formControlName="name"
          />
        </div>
        <div class="col">
          <input
            required
            [class.is-invalid]="
              group.controls.quantity.touched && group.controls.quantity.invalid
            "
            [class.is-valid]="
              group.controls.quantity.touched && group.controls.quantity.valid
            "
            type="number"
            class="form-control mb-2"
            placeholder="Quantité"
            formControlName="quantity"
          />
        </div>

        <div class="col-1">
          <button
            (click)="ingredients.removeAt(i)"
            class="btn btn-sm btn-danger"
            type="button"
          >
            X
          </button>
        </div>
      </div>

      <button class="btn btn-success">Créer la recette</button>
    </form>
  </div>`,
})
export class ReactiveRecipeComponent {
  recipe = new FormGroup({
    title: new FormControl(''),
    ingredients: new FormArray<
      FormGroup<{ name: FormControl; quantity: FormControl }>
    >([]),
  });

  get title() {
    return this.recipe.controls.title;
  }

  get ingredients() {
    return this.recipe.controls.ingredients;
  }

  addIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(''),
        quantity: new FormControl(),
      })
    );
  }

  onSubmit() {
    console.log(this.recipe.value);
  }
}
