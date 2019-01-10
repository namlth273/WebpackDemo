import * as ko from "knockout";

class CreateRequestViewModel {
    isActive: KnockoutObservable<boolean> = ko.observable(true);
    title: KnockoutObservable<number> = ko.observable(0);
    number = 1;

    constructor() {
        var that = this;
        that.isActive.subscribeTo("CreateRequest-IsActive");
        that.title.publishOn("CreateRequest-Title");
    }

    update = () => {
        var that = this;
        that.title(that.number++);
    }
}

export class CreateRequestComponent {
    constructor() {
        return {
            viewModel: CreateRequestViewModel,
            template: require("html-loader!./createRequest.html")
        };
    }
}
