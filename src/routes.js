import { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './pages/main';
import Product from './pages/product';

const AppNavigator = createStackNavigator({
    Main,
    Product
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: "#9c4de4"
        },
        headerTintColor: "#FFF"
    }
});

export default createAppContainer(AppNavigator);
