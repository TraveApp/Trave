import React from "react";
import { View, Button } from "react-native";
import styled from "styled-components/native";
import { useFavorites } from "../../hooks/useFavorites";
import type { ThemeBase } from "../../themes";

export default function Home({ navigation }: any) {
  const { favorites } = useFavorites();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PageTitle>Home Screen</PageTitle>
      {favorites.map((item) => (
        <Temp key={`${item.from.id} - ${item.to.id}`}>
          <PageTitle>
            {item.from.name} - {item.to.name}
          </PageTitle>
        </Temp>
      ))}
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Search")}
      />
    </View>
  );
}

const PageTitle = styled.Text`
  padding: 10px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const Temp = styled.View`
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  margin: 20px;
  height: 40px;
  border-radius: 1000px;
`;
