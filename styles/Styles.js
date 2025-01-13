import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      margin: 12,
    },

    fullscreen: {
      width: "100%",
      height: "100%"
    },
  
    textInput: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
  
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },

    divider: {
      marginVertical: 12
    },

    chip: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginRight: 12
    },

    cardView: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },

    card: {
      width: "48%",
      marginVertical: 10
    }
  });

  export default styles;