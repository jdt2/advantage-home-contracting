import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#3A5872'
    },
    requestArea: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    header: {
        fontSize: 36,
        marginBottom: 10,
    },
    loginInput: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    headerRight: {
        paddingRight: 15,
    },
    tab: {
        padding: 10,
    },
    center: {
        textAlign: 'center',
    },
    serviceIcon: {
        marginRight: 10,
        width: 60,
        height: 60,
    },
    previewImage: {
        width: 250,
        height: 250,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallImage: {
        width: 90,
        height: 90,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'grey',
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
    },
    cardSpace: {
        marginBottom: 20,
    },
    // Home
    cardHeader: {
        fontSize: 36,
        color: '#5987a7',
        textAlign: 'center',
    },
    // Progress Bar
    progressBar: {
        flex: 1,
        flexDirection: 'row',
        padding: 0,
    },
    startProgress: {
        width: 50,
        height: 40,
        borderWidth: 3,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleProgress: {
        width: 50,
        height: 40,
        borderWidth: 3,
        borderLeftWidth: 0,
    },
    endProgress: {
        width: 47,
        height: 40,
        borderWidth: 3,
        borderLeftWidth: 0,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    filledProgress: {
        backgroundColor: 'lawngreen',
    }
});
