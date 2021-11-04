import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        backgroundColor: '#282B33',
        flex: 1
    },
    headingContainer: {
        flex: 0.18,
        justifyContent: "flex-end",


    },
    title: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 37,
        textAlign: "center"
    },
    infoArea: {
        flex: 0.547,

        alignItems: "center"
    },
    nextArea: {
        alignItems: "center",
        flex: 0.158,

        justifyContent: "center"
    },
    next: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        borderRadius:24

    },
    number: {
        flex: 0.20,

        justifyContent: "center"
    },
    instructions: {

        flex: 0.8,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    text: {
        color: 'white',
        fontFamily: 'System',
        fontSize: 20,
        textAlign: "center"
    }
})