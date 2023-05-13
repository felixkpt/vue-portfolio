const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    publicVisitedViews: state => state.publicTagsView.visitedViews,
    publicCachedViews: state => state.publicTagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    permission_routes: state => state.permission_admin.routes,
    public_routes: state => state.permission_public.routes,
    errorLogs: state => state.errorLog.logs
}
export default getters
