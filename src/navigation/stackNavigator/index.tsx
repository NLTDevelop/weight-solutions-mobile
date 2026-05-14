import { AuthorizationView } from '@/modules/Authorization/Authorization';
import { RestorePasswordView } from '@/modules/Authorization/RestorePassword';
import { CompaniesView } from '@/modules/Companies/Companies';
import { CompanyView } from '@/modules/Companies/Company';
import { CreateCompanyView } from '@/modules/Companies/CreateCompany';
import { EditCompanyView } from '@/modules/Companies/EditCompany';
import { CreateProductView } from '@/modules/Products/CreateProduct';
import { EditProductView } from '@/modules/Products/EditProduct';
import { ProductView } from '@/modules/Products/Product';
import { ContactInformationView } from '@/modules/Profile/ContactInformation';
import { ChangePasswordView } from '@/modules/Profile/ChangePassword';
import { EditContactInformationView } from '@/modules/Profile/EditContactInformation';
import { EditPersonalDataView } from '@/modules/Profile/EditPersonalData';
import { LinkedObjectsView } from '@/modules/Profile/LinkedObjects';
import { PersonalDataView } from '@/modules/Profile/PersonalData';
import { SplashView } from '@/modules/Splash/ui';
import { CreateUserView } from '@/modules/Users/ui/CreateUser';
import { EditUserView } from '@/modules/Users/ui/EditUser';
import { UserView } from '@/modules/Users/ui/User';
import { UsersManagementView } from '@/modules/Users/ui/UsersManagement';
import { CreateWeighingView } from '@/modules/Weighing/CreateWeighing';
import { EditWeighingView } from '@/modules/Weighing/EditWeighing';
import { WeighingView } from '@/modules/Weighing/Weighing';
import { WeighingsListView } from '@/modules/Weighing/Weighings/ui/WeighingsListView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { TabNavigator } from '../tabNavigator';

const Stack = createNativeStackNavigator();

export const MainStackNavigator = observer(() => {
    return (
        <Stack.Navigator initialRouteName="SplashView" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashView" component={SplashView} />
            <Stack.Screen name="AuthorizationView" component={AuthorizationView} />
            <Stack.Screen name="RestorePasswordView" component={RestorePasswordView} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="CompaniesView" component={CompaniesView} />
            <Stack.Screen name="CompanyView" component={CompanyView} />
            <Stack.Screen name="CreateCompanyView" component={CreateCompanyView} />
            <Stack.Screen name="EditCompanyView" component={EditCompanyView} />
            <Stack.Screen name="CreateWeighingView" component={CreateWeighingView} />
            <Stack.Screen name="WeighingsListView" component={WeighingsListView} />
            <Stack.Screen name="WeighingView" component={WeighingView} />
            <Stack.Screen name="EditWeighingView" component={EditWeighingView} />
            <Stack.Screen name="CreateProductView" component={CreateProductView} />
            <Stack.Screen name="ProductView" component={ProductView} />
            <Stack.Screen name="EditProductView" component={EditProductView} />
            <Stack.Screen name="CreateUserView" component={CreateUserView} />
            <Stack.Screen name="UserView" component={UserView} />
            <Stack.Screen name="EditUserView" component={EditUserView} />
            <Stack.Screen name="UsersManagementView" component={UsersManagementView} />
            <Stack.Screen name="PersonalDataView" component={PersonalDataView} />
            <Stack.Screen name="EditPersonalDataView" component={EditPersonalDataView} />
            <Stack.Screen name="ContactInformationView" component={ContactInformationView} />
            <Stack.Screen name="ChangePasswordView" component={ChangePasswordView} />
            <Stack.Screen name="EditContactInformationView" component={EditContactInformationView} />
            <Stack.Screen name="LinkedObjectsView" component={LinkedObjectsView} />
        </Stack.Navigator>
    );
});
