class ModalSampleViewModel {
    modalId: KnockoutObservable<string> = ko.observable("modalSampleId");
    modalTitle: KnockoutObservable<string> = ko.observable("Modal Sample");
    isModalActive: KnockoutObservable<boolean> = ko.observable(false);
    popupClick = () => {
        var that = this;
        that.isModalActive(!that.isModalActive());
    };
}

export class ModalSampleComponent {
    constructor() {
        return {
            viewModel: ModalSampleViewModel,
            template: require("html-loader!./modalSample.html")
        };
    }
}