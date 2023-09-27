import store from "react-native-simple-store";
import menu_data from "./screens/SideBar/menu_data";

var gUser = null

store.get(menu_data.StoreName).then((res) => {
        if(res) gUser = res
    }
)

export default gUser


