import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

import SimpleScrollView from "@/components/SimpleScrollView";

import ListItemCard from "./ListItemCard";

import { HorizontalLine } from "../ui/HorizontalLine";

const screenWidth = Dimensions.get("window").width;

const ListView = () => {
  const { groups, items } = useSelector((state: any) => state.menu);
  const [activeGroup, setActiveGroup] = useState<number>(groups[0].groupId);

  return (
    <SimpleScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.menuWrapper}
      >
        <View style={styles.menuTabContainer}>
          {groups.map((group: { groupId: number; groupName: string }) => (
            <TouchableOpacity
              key={group.groupId}
              onPress={() => setActiveGroup(group.groupId)}
              style={[
                styles.menuTab,
                activeGroup === group.groupId && styles.menuTabActive,
              ]}
            >
              <Text
                style={[
                  styles.menuTabText,
                  activeGroup === group.groupId && styles.menuTabTextActive,
                ]}
              >
                {group.groupName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.contentContainer}>
        {groups[activeGroup].itemIds.map((itemId: number) => (
          <React.Fragment key={itemId}>
            <ListItemCard item={items[itemId]} />
            <HorizontalLine />
          </React.Fragment>
        ))}
      </View>
    </SimpleScrollView>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    flexGrow: 0,
  },
  menuTabContainer: {
    flexDirection: "row",
    paddingHorizontal: 23,
    borderBottomWidth: 4,
    borderBottomColor: "#c5c5c5",
  },
  menuTab: {
    marginHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
    marginBottom: -4,
  },
  menuTabActive: {
    borderBottomColor: "#593c0a",
  },
  menuTabText: {
    fontFamily: "Times New Roman",
    color: "#593c0a",
    fontSize: 20,
    fontWeight: "400",
  },
  menuTabTextActive: {
    color: "#593c0a",
  },
  contentContainer: {
    width: screenWidth,
  },
});

export default ListView;
