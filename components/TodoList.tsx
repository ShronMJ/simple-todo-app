import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { Input } from 'react-native-design-system';
import DraggableFlatList, {
  ScaleDecorator,
  DragEndParams,
  RenderItemParams
} from "react-native-draggable-flatlist";
import { v4 as uuidv4 } from "uuid";
import { FontAwesome } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addToDo, deleteToDo, editToDo, sortToDo, newUser } from "../redux/slice";
import { TextInput } from 'react-native-gesture-handler';

interface itemtype {
  itemId: string,
  todo: string,
  isCompleted: boolean
}

const TodoList: React.FC<{ userId: string }> = ({ userId }) => {
  const [text, setText] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [editTarget, setEditTarget] = useState('');
  const [editText, setEditText] = useState("");
  const inputRef = useRef<any>(null)
  const todoData = useAppSelector(state => state.toDo.find(user => user.userId === userId))
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
    setSubmitted(false);
  }, [submitted])

  useEffect(() => {
    !todoData && dispatch(newUser({ userId }))
  }, [userId])

  const handleTextInput = (input: string) => { setText(input); };

  const handleAddTodo = () => {
    const todo = text.trim();
    if (!todo) return;
    const itemId = uuidv4();
    dispatch(addToDo({ userId: userId, todo: { itemId, todo, isCompleted: false } }));
    setText("");
    setSubmitted(true);
  };

  const handleMarkAsCompleted = (item: itemtype) => {
    const todo = { ...item, isCompleted: !item.isCompleted }
    dispatch(editToDo({ userId: userId, todo }))
  };

  const handleEditTodo = (item: itemtype) => {
    if (item.isCompleted) return;
    if (editTarget === item.itemId) {
      const todo = { ...item, todo: editText }
      dispatch(editToDo({ userId: userId, todo }))
      setEditTarget('')

    } else {
      setEditTarget(item.itemId)
      setEditText(item.todo)
      return;
    }
  };

  const handleDeleteTodo = (itemId: string) => {
    dispatch(deleteToDo({ userId: userId, itemId }))
  };

  const handleDragEnd = ({ data }: DragEndParams<itemtype>) => {
    dispatch(sortToDo({ userId: userId, userTodo: data }));
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<itemtype>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPress={() => handleMarkAsCompleted(item)}
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "#FAF9F6" : "white" },
          ]}
        >
          {item.itemId === editTarget
            ? <TextInput
              style={styles.textContentEdit}
              value={editText}
              onChangeText={setEditText}
              placeholder={item.todo}
            />
            : <Text style={[
              styles.textContent,
              { textDecorationLine: item.isCompleted ? "line-through" : "none" }
            ]}>{item.todo}</Text>
          }
          <View>
            <TouchableOpacity onPress={() => handleDeleteTodo(item.itemId)}>
              <Text style={styles.textDelete}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEditTodo(item)}>
              {item.itemId !== editTarget
                ? <Text style={styles.textEdit}>Edit</Text>
                : <Text style={styles.textEdit}>Save</Text>}
            </TouchableOpacity>
          </View>

        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={{ minWidth: "40%" }}>
      <Input
        ref={inputRef}
        value={text}
        outline
        onChangeText={handleTextInput}
        onSubmitEditing={handleAddTodo}
        placeholder="What's on your mind?"
        rightIcon={
          <TouchableOpacity onPress={handleAddTodo}>
            <FontAwesome name="plus-square" size={24} color="black" />
          </TouchableOpacity>
        }
      />
      <View style={{ height: 10 }} />
      {!todoData
        ?
        <>
          <ActivityIndicator size={"large"} color={"#312651"} />
          <Text style={styles.textContent}>Loading...</Text>
        </>
        :
        <DraggableFlatList
          data={todoData.userTodo}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => item.itemId}
          renderItem={renderItem}
          nestedScrollEnabled={true}
        />

      }
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    minHeight: 50,
    maxWidth: 600,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    marginVertical: 3,
  },
  textContent: {
    fontSize: 20,
    fontFamily: "DMMedium",
    textAlign: "center",
    padding: 10,
  },
  textContentEdit: {
    fontSize: 20,
    fontFamily: "DMMedium",
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 6,
    marginLeft: 10
  },
  textDelete: {
    color: "red",
    fontSize: 16,
    fontFamily: "DMMedium",
    textAlign: "center",
    padding: 10
  },
  textEdit: {
    color: "blue",
    fontSize: 16,
    fontFamily: "DMMedium",
    textAlign: "center",
    padding: 10,
  },
});

export default TodoList