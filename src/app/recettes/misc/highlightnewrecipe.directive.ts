import { OnInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Recipe } from '../model/recipe';

@Directive({ selector: '[appHighlightNewRecipe]'})
export class HighlightNewRecipeDirective implements OnInit {

    @Input('appHighlightNewRecipe')
    recipe_to_test!: Recipe;

    @Input('appHighlightNewRecipe_colour')
    highlight_color: string;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.highlight_color = 'yellow';
     }

    ngOnInit() {
        console.log(this.recipe_to_test);
        const date_added = new Date(this.recipe_to_test.date_added).getTime();
        if (new Date().getTime() - 4 * 86400000 < date_added) {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', this.highlight_color);
        }
    }
}