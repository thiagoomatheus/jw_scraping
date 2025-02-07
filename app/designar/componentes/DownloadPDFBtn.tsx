"use client";

import { Parte, Partes } from '@/app/lib/types/types';
import Btn from '@/app/minha-conta/components/btn';
import {  } from '@prisma/client';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

export default function DownloadPDFBtn( { designacoes }: { designacoes: Partes[] } ) {

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFF',
      padding: 15,
      fontFamily: 'Helvetica',
      fontSize: "8pt",
    },
    canticos: {
      fontSize: "9pt",
      fontFamily: "Helvetica-Bold",
      borderRight: "1px solid black",
      borderLeft: "1px solid black",
      flexBasis: "12%",
      backgroundColor: "#d9d9d9",
      textAlign: "center",
    },
  });

  const TabelaDesignacoesSecao = ( { partes }: { partes: Parte[]} ) => (
    <View style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid black", flexWrap: "wrap"}}>
      {partes.map((parte, index) => (
        <>
          <Text
            key={`tempo-${index}`}
            style={{flexBasis: "10%", borderRight: "1px solid black", textAlign: "center", fontFamily: "Helvetica-Bold"}}
          >
            {parte.tempo}
          </Text>

          <Text
            key={`parte-${index}`}
            style={{flexBasis: "65%", borderRight: "1px solid black", paddingLeft: "6px"}}
          >
            {parte.nome}
          </Text>

          <Text
            key={`participante-${index}`}
            style={{flexBasis: "25%", paddingLeft: "6px"}}
          >
            - {parte.participante}
          </Text>
        </>
      ))}
    </View>
  )

  const TabelaDesignacoesCompleta = ( { designacoes }: {designacoes: Partes} ) => (
    <View style={{ width: "100%", border: "2px solid black"}}>

      <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", borderBottom: "1px solid black"}}>
        <Text style={{fontSize: "9pt", fontFamily: "Helvetica-Bold", flexBasis: "18%", backgroundColor: "#d9d9d9", paddingLeft: "6px"}}>
          {designacoes.diaReuniao}
        </Text>

        <Text style={styles.canticos}>
          {designacoes.canticos[0]}
        </Text>

        <Text style={{borderRight: "1px solid black", flexBasis: "25%", paddingLeft: "6px"}}>
          Oração: {designacoes?.outros.find((parte) => parte.nome === "Oração Inicial")?.participante}
        </Text>

        <Text style={{flexBasis: "45%", paddingLeft: "6px"}}>
          Comentários iniciais: {designacoes?.outros.find((parte) => parte.nome === "Presidente")?.participante}
        </Text>
      </View>

      <View style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid black", gap: "80px"}}>
        <Text style={{fontFamily: "Helvetica-Bold", borderRight: "1px solid black", flexBasis: "30%", backgroundColor: "#0f766e", textAlign: "center", color: "white"}}>
          TESOUROS DA PALAVRA DE DEUS
        </Text>

        <Text style={{fontFamily: "Helvetica-Bold", backgroundColor: "#7d4d98", color: "white", textAlign: "center", flexBasis: "20%", borderRight: "1px solid black", borderLeft: "1px solid black"}}>
          {designacoes?.capitulos}
        </Text>
      </View>
      
      <TabelaDesignacoesSecao partes={designacoes.tesouros} />

      <View style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid black"}}>
        <Text style={{fontFamily: "Helvetica-Bold", borderRight: "1px solid black", flexBasis: "30%", backgroundColor: "#ca8a04", textAlign: "center", color: "white"}}>
          FAÇA SEU MELHOR NO MINISTÉRIO
        </Text>
      </View>

      <TabelaDesignacoesSecao partes={designacoes.ministerio} />

      <View style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid black", gap: "80px"}}>
        <Text style={{fontFamily: "Helvetica-Bold", borderRight: "1px solid black", flexBasis: "30%", backgroundColor: "#991b1b", textAlign: "center", color: "white"}}>
          NOSSA VIDA CRISTÃ
        </Text>

        <Text style={styles.canticos}>
          {designacoes?.canticos[1]}
        </Text>
      </View>

      <TabelaDesignacoesSecao partes={designacoes.vida} />

      <View style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid black", justifyContent: "flex-end"}}>
        <Text style={{flexBasis: "12%", borderRight: "1px solid black", borderLeft: "1px solid black", paddingLeft: "6px"}}>
          Leitor:
        </Text>

        <Text style={{flexBasis: "25%", paddingLeft: "6px"}}>
          - {designacoes?.outros.find((parte) => parte.nome === "Leitor")?.participante}
        </Text>
      </View>

      <View style={{width: "100%", display: "flex", flexDirection: "row"}}>
        <Text style={{paddingLeft: "6px", flexBasis: "63%"}}>
          Recapitulação e visão geral da próxima semana
        </Text>

        <Text style={styles.canticos}>
          {designacoes?.canticos[2]}
        </Text>

        <Text style={{flexBasis: "25%", paddingLeft: "6px"}}>
          Oração: {designacoes?.outros.find((parte) => parte.nome === "Oração Final")?.participante}
        </Text>
      </View>
    </View>
  )
    
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ backgroundColor: "#3b82f6", padding: 5, borderRadius: 5 }}>
          <Text style={{ fontSize: 20, fontFamily: "Helvetica-Bold", textAlign: "center", color: "white" }}>Reunião Nossa Vida e Ministério</Text>
        </View>
        <View style={{ width: "100%", marginTop: 10, lineHeight: "11pt", display: "flex", flexDirection: "column", gap: "10px"}}>
          {designacoes.map((designacao) => (
            <TabelaDesignacoesCompleta designacoes={designacao} key={designacao.id} />
          ))}
        </View>
      </Page>
    </Document>
  );

    return (
      <PDFDownloadLink document={<MyDocument />} fileName={`designacoes.pdf`}>
        <Btn>Download PDF</Btn>
      </PDFDownloadLink>
    )
}