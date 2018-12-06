export class Changed <T> {

    constructor ( obj: T, isAdded: boolean ) {
        this.obj = obj;
        this.isAdded = isAdded;
    }

    obj: T;
    isAdded: boolean;
}