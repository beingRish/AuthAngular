import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatButtonModule, MatIconButton } from "@angular/material/button"
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'

const data : any =  [
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
];

@NgModule({
    imports: data,
    exports: data,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule {

}