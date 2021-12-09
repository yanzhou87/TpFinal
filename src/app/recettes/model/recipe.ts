
export interface Ingredient {
    ingredient: string | null;
    measure: string | null;
}

export interface Instruction {
    instruction: string | null;
    photo: string | null;
}

export class Recipe {
    public id: number;
    public title: string;
    public description: string;
    public feeds_this_many: number;    // # ppl
    public preparation_time: number;   // minutes
    public ingredients: Ingredient[];
    public instructions: Instruction[];
    public cover_photo: string | null;
    public keywords: string[] | null;
    public date_added: string;

    constructor(id: number, t: string, d: string, feeds: number, pt: number,
                ingr: Ingredient[], instr: Instruction[], cp: string | null,
                keywords: string[] | null, date_added: string) {
        this.id = id;
        this.title = t;
        this.description = d;
        this.feeds_this_many = feeds;
        this.preparation_time = pt;
        this.ingredients = ingr;
        this.instructions = instr;
        this.cover_photo = cp;
        this.keywords = keywords;
        this.date_added = date_added;
    }

    public static recipeFromJSON(obj: any): Recipe {
        return new Recipe(obj.id, obj.title, obj.description, obj.feeds_this_many, obj.preparation_time,
                          obj.ingredients, obj.instructions, obj.cover_photo, obj.keywords, obj.date_added);
    }

    public static createBlank(): Recipe {
        return new Recipe(-1, '', '', 1, 1, [], [], null, null, new Date().toISOString());
    }
}

export class RecipesPayload {
    error!: string;
    data!: Recipe [];
}

export class RecipePayload {
    error!: string;
    data!: Recipe;
}

export class DeleteRecipePayload {
    error!: string;
    status!: string;
}


export interface Identification{
    error: string;
    data: string;
}