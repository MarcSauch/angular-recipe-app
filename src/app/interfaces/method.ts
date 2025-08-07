export interface Method {
}

export interface MethodDTO {
    recipe_id: number;
    step_id: number;
    step: string;
    step_number: number;
}

export interface CreateMethodDTO extends Omit<MethodDTO, "step_id"> {
    recipe_id: number;
    step: string;
    step_number: number;
}
