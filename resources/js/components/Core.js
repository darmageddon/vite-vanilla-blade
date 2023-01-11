const init = () => {
    console.log('Running in every page...')
}

const afterInit = () => {
    console.log(`Current route: ${route().current()}`)
}

export {
    init,
    afterInit
}