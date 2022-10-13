import { useEffect, useState } from "react";

import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";

import logo from "../../assets/logo-nlw-esports.png";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { AdsTypes, DuoCard } from "../../components/DuoCard";

import { styles } from "./styles";

import { THEME } from "../../theme";
import { ipAdress } from "../../utils/ipAdress";
import { Duomatch } from "../../components/Duomatch";

export function Game() {
  const [duos, setDuos] = useState<AdsTypes[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>("");

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDiscordDuo() {
    discordDuoSelected.length > 0 ? setDiscordDuoSelected("") : false;
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://${ipAdress}:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://${ipAdress}:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logo} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.baseUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              key={item.id}
              onConnect={() => getDiscordUser(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <Duomatch
          discord={discordDuoSelected}
          visible={!!discordDuoSelected}
          onClose={handleDiscordDuo}
        />
      </SafeAreaView>
    </Background>
  );
}
