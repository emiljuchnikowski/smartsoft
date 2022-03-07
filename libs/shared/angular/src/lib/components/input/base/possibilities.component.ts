import {ChangeDetectorRef, Directive, Inject, Optional, Type} from "@angular/core";
import {Observable} from "rxjs";

import {
    IModelPossibilitiesProvider,
    MODEL_POSSIBILITIES_PROVIDER
} from "../../../providers/model-possibilities.provider";
import {InputBaseComponent} from "./base.component";
import {debounceTime} from "rxjs/operators";

@Directive()
export abstract class InputPossibilitiesBaseComponent<T> extends InputBaseComponent<T> {
    protected constructor(
        cd: ChangeDetectorRef,
        @Optional()
        @Inject(MODEL_POSSIBILITIES_PROVIDER) private modelPossibilitiesProvider: IModelPossibilitiesProvider
    ) {
        super(cd);
    }

    protected afterSetOptionsHandler() {
        super.afterSetOptionsHandler();

        const refreshPossibilities = () => {
            const possibilitiesFromProvider$ = this.getPossibilitiesFromProvider();
            if (possibilitiesFromProvider$) this.possibilities$ = possibilitiesFromProvider$
        };

        refreshPossibilities();

        this.internalOptions.control.parent.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(() => {
            refreshPossibilities();
            this.cd.detectChanges();
        });
    }

    protected getPossibilitiesFromProvider(): Observable<{ id: any, text: string }[]> {
        if (!this.modelPossibilitiesProvider) return null;

        return this.modelPossibilitiesProvider.get({
            type: this.internalOptions?.model?.constructor as Type<any>,
            key: this.internalOptions.fieldKey,
            instance: this.internalOptions.control.parent?.value
        });
    }
}