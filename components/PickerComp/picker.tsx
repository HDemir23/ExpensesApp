
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { usePickerStyle } from "./picker.style";

const options = ["Option A", "Option B", "Option C"];


export default function Picker() {
  const styles = usePickerStyle()
  const [selected, setSelected] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSelect = (item: string) => {
    setSelected(item);
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.pickerBox}
      >
        <Text style={styles.pickerText}>{selected || "Select an option"}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.option}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}


