///<reference path="../../typings/globals/core-js/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import "rxjs/Rx";
import { AppComponent } from "./app.component";
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }