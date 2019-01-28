require("expose-loader?ko!knockout");
import { CreateRequestComponent } from "./scripts/components/createRequest";
import { ModalComponent } from "./scripts/components/modal/modal";
import { ModalSampleComponent } from "./scripts/components/modalSample/modalSample";
import { ScopeOfWorkComponent } from "./scripts/components/scopeOfWork/scopeOfWork";

// console.log("hello from index.ts");
// console.log(greet("Nam"));

class IndexViewModel {
    isActive: KnockoutObservable<boolean> = ko.observable(false);
    title: KnockoutObservable<number> = ko.observable(0);

    constructor() {
        var that = this;
        that.isActive.publishOn("CreateRequest-IsActive");
        that.title.subscribeTo("CreateRequest-Title");
    }

    update = () => {
        var that = this;
        that.isActive(!that.isActive());
    }
}

ko.components.register("modal", new ModalComponent());
ko.components.register("modal-sample", new ModalSampleComponent());
ko.components.register("create-request", new CreateRequestComponent());
ko.components.register("scope-of-work", new ScopeOfWorkComponent());
ko.applyBindings(new IndexViewModel());
