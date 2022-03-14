import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Tooltip } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import colors from '../constants/colors';

import firebase from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    height: '80%',
    backgroundColor: colors.primary,
    marginTop: 'auto',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 30,
    paddingTop: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    marginBottom: 20,
  },
  helpSentence: {
    fontSize: 24,
    marginRight: 10,
  },
  missing: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  continueBtn: {
    width: '100%',
    backgroundColor: colors.gray,
    height: 60,
    borderRadius: 60,
  },
  checkBtn: {
    width: '100%',
    backgroundColor: colors.lightBlue,
    borderRadius: 60,
    height: 60,
    shadowColor: colors.border,
    shadowOffset: { width: -2, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalContinueBtn: {
    backgroundColor: colors.white,
    marginTop: 20,
  },
  btnTxt: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 60,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  words: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  word: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: colors.border,
    shadowOffset: { width: -2, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  filled: {
    backgroundColor: colors.secondary,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  wordTxt: {
    fontWeight: '800',
    color: colors.primary,
  },
  wordWrapper: {
    padding: 10,
  },
  problem: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  problemWord: {
    textDecorationStyle: 'dotted',
    color: colors.white,
    fontSize: 24,
    textDecorationColor: colors.white,
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  problemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  missedWord: {
    color: colors.primary,
    fontSize: 24,
  },
  blank: {
    width: 100,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    textDecorationColor: colors.white,
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  innerModal: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  originState: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});


export const Home = () => {
  const [missing, setMissing] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);
  const [isRight, setRight] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [problems, setProblems] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const subscribe = async () => {
      const ref = firebase.database().ref('Exercises');
      const snapshot = await ref.once('value');
      const value = await snapshot.val();
      setProblems(Object.values(value));
    };
    subscribe();
  }, []);
  if (!problems.length) return null;
  const rightAns = problems[index][problems[index].missing];
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>Fill in the missing word</Text>
          <View style={styles.originState}>
            {problems[index].pb.split(' ').map(i => (
              <Text
                key={i}
                style={[
                  styles.label,
                  styles.helpSentence,
                  i === problems[index].missing && styles.missing,
                ]}
              >
                {i}
              </Text>
            ))}
          </View>
          <View style={styles.problem}>
            {problems[index].pb.split(' ').map(i =>
              i === problems[index].missing ? (
                <View
                  key={i}
                  style={[
                    missing === '' ? styles.blank : styles.word,
                    { marginRight: 10 },
                    {
                      // eslint-disable-next-line no-nested-ternary
                      backgroundColor: checked
                        ? isRight
                          ? colors.lightBlue
                          : colors.error
                        : missing === ''
                        ? 'transparent'
                        : colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.missedWord,
                      { color: checked ? colors.white : colors.primary },
                    ]}
                  >
                    {missing}
                  </Text>
                </View>
              ) : (
                <View style={styles.problemWrapper} key={i}>
                  <Tooltip
                    width={100}
                    backgroundColor={colors.gray}
                    overlayColor="transparent"
                    popover={<Text style={styles.wordTxt}>{i}</Text>}
                  >
                    <Text style={styles.problemWord}>{problems[index][i]}</Text>
                  </Tooltip>
                </View>
              ),
            )}
          </View>
          <View style={styles.words}>
            {problems[index].words.split(',').map(i => (
              <View key={i} style={styles.wordWrapper}>
                <TouchableOpacity
                  key={i}
                  style={missing === i ? styles.filled : styles.word}
                  onPress={() => setMissing(i)}
                >
                  <Text
                    style={[
                      styles.wordTxt,
                      missing === i && { color: colors.secondary },
                    ]}
                  >
                    {i}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        {missing === '' ? (
          <TouchableOpacity style={styles.continueBtn} activeOpacity={1}>
            <Text style={styles.btnTxt}>continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.checkBtn}
            onPress={() => {
              setVisible(true);
              setChecked(true);
              if (rightAns === missing) {
                setRight(true);
              } else {
                setRight(false);
              }
            }}
          >
            <Text style={styles.btnTxt}>check answer</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal isVisible={isVisible} style={styles.modalContainer}>
        <View
          style={[
            styles.innerModal,
            { backgroundColor: isRight ? colors.lightBlue : colors.error },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.statusTxt}>
              {isRight ? 'Great Job!' : `Answer: ${rightAns}`}
            </Text>
            <Icon name="flag" size={20} color="white" />
          </View>
          <TouchableOpacity
            style={[styles.checkBtn, styles.modalContinueBtn]}
            onPress={() => {
              setVisible(false);
              setMissing('');
              setChecked(false);
              if (index === problems.length - 1) {
                setIndex(0);
              } else {
                setIndex(index + 1);
              }
            }}
          >
            <Text
              style={[
                styles.btnTxt,
                { color: isRight ? colors.lightBlue : colors.error },
              ]}
            >
              {index === problems.length - 1 ? 'restart' : 'continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
