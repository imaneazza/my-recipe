import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  currentRecipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if(param.id)
      this.id = +param.id;
      this.editMode = param['id'] != null;
      if (this.id !== null && this.id !== undefined)
        this.currentRecipe = this.recipeService.getRecipe(this.id);
      this.initForm();
    });
  }
  private initForm() {
    let formIng = new FormArray([]);
    if (this.currentRecipe && this.currentRecipe.ingredients) {
      this.currentRecipe.ingredients.forEach((ing) => {
        formIng.push(
          new FormGroup({
            name: new FormControl(ing.name, [Validators.required]),
            amount: new FormControl(ing.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(this.editMode ? this.currentRecipe.name : '', [
        Validators.required,
      ]),
      imagePath: new FormControl(
        this.editMode ? this.currentRecipe.imagePath : '',
        [Validators.required]
      ),
      description: new FormControl(
        this.editMode ? this.currentRecipe.description : '',
        [Validators.required]
      ),
      ingredients: formIng,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updaterecipe( this.recipeForm.value,this.id);
    } else {
      this.recipeService.addrecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddingredient() {
    this.controls.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  deleteIngredient(ind: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ind)
  }
}
