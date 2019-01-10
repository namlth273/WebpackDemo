require("expose-loader?ko!knockout"); 
import { CreateRequestComponent } from "./scripts/components/createRequest";

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

ko.components.register("create-request", new CreateRequestComponent());
ko.applyBindings(new IndexViewModel());
