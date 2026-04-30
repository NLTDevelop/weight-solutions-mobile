import { AuthorizationView } from '@/modules/Authorization/Authorization';
import { CompaniesView } from '@/modules/Companies/Companies';
import { CompanyView } from '@/modules/Companies/Company';
import { CreateCompanyView } from '@/modules/Companies/CreateCompany';
import { LinkedObjectsView } from '@/modules/Profile/LinkedObjects';
import { PersonalDataView } from '@/modules/Profile/PersonalData';
import { SplashView } from '@/modules/Splash/ui';
import { CreateUserView } from '@/modules/Users/ui/CreateUser';
import { EditUserView } from '@/modules/Users/ui/EditUser';
import { UserView } from '@/modules/Users/ui/User';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { TabNavigator } from '../tabNavigator';

const Stack = createNativeStackNavigator();

export const MainStackNavigator = observer(() => {
    return (
        <Stack.Navigator initialRouteName="SplashView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashView" component={SplashView} />
            <Stack.Screen name="AuthorizationView" component={AuthorizationView} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="CompaniesView" component={CompaniesView} />
            <Stack.Screen name="CompanyView" component={CompanyView} />
            <Stack.Screen name="CreateCompanyView" component={CreateCompanyView} />
            <Stack.Screen name="CreateUserView" component={CreateUserView} />
            <Stack.Screen name="UserView" component={UserView} />
            <Stack.Screen name="EditUserView" component={EditUserView} />
            <Stack.Screen name="PersonalDataView" component={PersonalDataView} />
            <Stack.Screen name="LinkedObjectsView" component={LinkedObjectsView} />
        </Stack.Navigator>
    );
});
