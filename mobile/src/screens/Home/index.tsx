import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";

import logo from "../../assets/logo-nlw-esports.png";

import { SafeAreaView } from "react-native-safe-area-context";

import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { ipAdress } from "../../utils/ipAdress";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, baseUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, baseUrl });
  }

  useEffect(() => {
    fetch(`http://${ipAdress}:3333/games`)
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(game) => game.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
