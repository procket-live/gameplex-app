import { StackActions, NavigationActions, NavigationTabAction } from 'react-navigation';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

export function navigate(routeName, params = {}) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

export function changeTab(routeName) {
    const action = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: "TabNavigator",
                action: NavigationActions.navigate({
                    routeName: routeName,
                })
            }),
        ]
    })

    _navigator.dispatch(action);
}

export function navigatePop() {
    _navigator.dispatch(
        NavigationActions.back()
    );
}

export function resetToScreen(screen, params = {}) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screen, params: params })],
    });

    _navigator.dispatch(resetAction);
}

export function openDrawer() {
    _navigator && _navigator._navigation.openDrawer();
}