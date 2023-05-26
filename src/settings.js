module.exports = {
    title: 'Complete admin dashboard',

    /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
    showSettings: true,

    /**
   * @type {boolean} true | false
   * @description Whether need tagsViewAdmin
   */
    tagsViewAdmin: true,
    
    tagsViewPublic: true,

    /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
    fixedHeader: false,

    /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
    clientSidebarLogo: true,
    sidebarLogo: false,

    /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
    errorLog: 'production'
}
