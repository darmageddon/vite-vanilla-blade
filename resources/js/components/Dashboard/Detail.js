(function () {
    const { detail } = ComponentData;

    // Detail: Id=12; Name=Unknown; Route=dashboard.detail
    console.log(`Detail: Id=${detail.id}; Name=${detail.name}; Route=${route().current()}`);
})();