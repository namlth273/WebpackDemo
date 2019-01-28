interface IScopeOfWorkItem {
    index: number;
    name: string;
    isFirstOfType: KnockoutObservable<boolean>;
    isLastOfType: KnockoutObservable<boolean>;
    isActive: KnockoutObservable<boolean>;
    isFirstActive: KnockoutObservable<boolean>;
    isLastActive: KnockoutObservable<boolean>;
    isOnly: KnockoutObservable<boolean>;
    isCenter: KnockoutObservable<boolean>;
}

enum EnumTransportMode {
  Air = 1,
  Sea = 2,
  Road = 3
}

class ScopeOfWorkViewModel {
    title: KnockoutObservable<string> = ko.observable("Scope Of Work");
    transportMode: KnockoutObservable<EnumTransportMode> = ko.observable(EnumTransportMode.Air);
    items: KnockoutObservableArray < IScopeOfWorkItem > = ko.observableArray([{
        index: 0,
        name: "item1",
        isFirstOfType: ko.observable(true),
        isLastOfType: ko.observable(false),
        isActive: ko.observable(false),
        isFirstActive: ko.observable(false),
        isLastActive: ko.observable(false),
        isOnly: ko.observable(false),
        isCenter: ko.observable(false)
      },
      {
        index: 1,
        name: "item2",
        isFirstOfType: ko.observable(false),
        isLastOfType: ko.observable(false),
        isActive: ko.observable(true),
        isFirstActive: ko.observable(true),
        isLastActive: ko.observable(false),
        isOnly: ko.observable(false),
        isCenter: ko.observable(true)
      },
      {
        index: 2,
        name: "item3",
        isFirstOfType: ko.observable(false),
        isLastOfType: ko.observable(false),
        isActive: ko.observable(true),
        isFirstActive: ko.observable(false),
        isLastActive: ko.observable(true),
        isOnly: ko.observable(false),
        isCenter: ko.observable(false)
      },
      {
        index: 3,
        name: "item4",
        isFirstOfType: ko.observable(false),
        isLastOfType: ko.observable(true),
        isActive: ko.observable(false),
        isFirstActive: ko.observable(false),
        isLastActive: ko.observable(false),
        isOnly: ko.observable(false),
        isCenter: ko.observable(false)
      }
    ]);

    constructor() {
        var that = this;
    }

    itemsLength = ko.computed(() => {
        var that = this;
        return that.items().length;
      });

    activeItems: KnockoutComputed<IScopeOfWorkItem[]> = ko.computed(() => {
        var that = this;
        var activeItems = that.items().filter((x) => { return x.isActive(); });
        return activeItems;
      });

    firstActiveItem: KnockoutComputed<IScopeOfWorkItem> = ko.computed(() => {
        var that = this;
        if (that.activeItems().length > 0) return that.activeItems()[0];
        else return null;
      });

    lastActiveItem: KnockoutComputed<IScopeOfWorkItem> = ko.computed(() => {
        var that = this;
        if (that.activeItems().length > 0) return that.activeItems()[that.activeItems().length - 1];
        else return null;
      });

    setActive = (name) => {
        var that = this;
        var item = that.items().filter((x) => {
          return x.name === name;
        });
        item[0].isActive(true);
      };
    
    stepClick = (currentItem) => {
        var that = this;
        if (currentItem.index === 0){
          currentItem.isFirstOfType(true);      
        }
    
        if (currentItem.index === that.items.length - 1){
          currentItem.isLastOfType(true);
        }
    
        currentItem.isActive(!currentItem.isActive());
    
        that.items().forEach((x) => {
          x.isOnly(false);
          x.isFirstActive(false);
          x.isLastActive(false);
        });
    
        if (currentItem.index > 0 && currentItem.index < that.lastActiveItem().index) {
          for (var _i = 0; _i < currentItem.index; _i++) {
            var _item = that.items()[_i];
            _item.isActive(false);
          }
        }
    
        that.firstActiveItem().isFirstActive(true);
        that.lastActiveItem().isLastActive(true);
    
        for (var _i = that.firstActiveItem().index + 1; _i < that.lastActiveItem().index; _i++) {
          that.items()[_i].isActive(true);
        }
    
        if (that.activeItems().length === 1) {
          that.activeItems()[0].isOnly(true);
        }
      };

      changeToAir = () => {
        var that = this;
        that.transportMode(EnumTransportMode.Air);
      }

      changeToSea = () => {
        var that = this;
        that.transportMode(EnumTransportMode.Sea);
      }
}

export class ScopeOfWorkComponent {
    constructor() {
        return {
            viewModel: ScopeOfWorkViewModel,
            template: require("html-loader!./scopeOfWork.html")
        };
    }
}
