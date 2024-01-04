import { AbstractControl , ValidationErrors } from "@angular/forms";

export class specialPasswordValidation {
    static specialPassword( control: AbstractControl ) : ValidationErrors | null {
        const controlValue = control.value;
        const atleast_one_lowercase = /^(.)*[a-z](.)*$/;
        const atleast_one_uppercase = /^(.)*[A-Z](.)*$/;
        const atleast_one_digit = /^(.)*[0-9](.)*$/;
        const atleast_one_special = /^(.)*[^a-zA-Z0-9 ](.)*$/;

        if( controlValue.length < 8 || !atleast_one_lowercase.test(controlValue) || !atleast_one_uppercase.test(controlValue) || !atleast_one_digit.test(controlValue) || !atleast_one_special.test(controlValue) ) {
            return { validation: true };
        }

        return null;
    }
}