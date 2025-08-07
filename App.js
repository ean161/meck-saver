import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image } from "react-native";

const App = () => {
    const [list, setList] = useState([]);
    const [ping, setPing] = useState("");

    const getList = async () => {
        try {
            const response = await fetch("https://meck-saver.ean.vn", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User-Agent": "ReactNative"
                },
            });

            const data = await response.json();
            console.log(data);
            setPing(data.ping);
            setList(data.data);
        } catch (error) {
            console.error("GET error:", error);
            throw error;
        }
    }

    useEffect(() => {
        getList();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={styles.wrapper}>
                <Text style={{marginBottom: 16, color:  GRAY_DARK_COLOR}}>{ping}</Text>
                <View style={styles.list}>
                    {
                        list.map((item, index) => {
                            return (
                                <View key={index} style={[item?.tran_id != 0 ? styles.piggy_tag : styles.tag, item?.is_last == 1 ? styles.last_tag : {}]}>
                                    {
                                        item?.tran_id != 0 ? 
                                        <Image style={styles.piggy} source={require("./assets/img/piggy.png")} />
                                        : <Text style={styles.val}>{item.value}</Text>
                                    }
                                    
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const LIGHT_COLOR = "#FFFFFF";
const DARK_COLOR = "#000000";
const GRAY_COLOR = "#f2f2f291";
const GRAY_MID_COLOR = "#d9d9d9b1";
const GRAY_DARK_COLOR = "#8e8e93";
const BLUE_COLOR = "#004d94ff";
const RED_COLOR = "#c70000c0";
const RED_DARK_COLOR = "#f1072eff";
const RED_FADED_COLOR = "#fe294c13";
const GREEN_COLOR = "#5AD439";
const GREEN_FADED_COLOR = "#e1f5dc";

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
    },
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    tag: {
        margin: 5,
        height: 35,
        width: 50,
        borderRadius: 3,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GRAY_COLOR,
    },
    piggy_tag: {
        margin: 5,
        height: 35,
        width: 50,
        borderRadius: 3,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: LIGHT_COLOR,
        backgroundColor: RED_COLOR,
    },
    val: {
        fontWeight: 700,
        fontSize: 14,
        color: DARK_COLOR,
    },
    piggy: {
        width: 30,
        height: 30,
        resizeMode: "cover",
    },
    last_tag: {
        backgroundColor: BLUE_COLOR,
    }
});

export default App;