import React from "react";
import { View, Button } from "react-native";
import styled from "styled-components/native";
import type { ThemeBase } from '../../themes';

export default function Home({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PageTitle>Home Screen</PageTitle>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Search")}
      />
    </View>
  );
}

const PageTitle = styled.Text`
  color: ${({theme}: {theme: ThemeBase}) => theme.colors.text};
`;