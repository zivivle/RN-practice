## 1. FlatList와 SectionList의 차이점!

FlatList의 경우 data를 아래와 같이 방법으로만 전달할 수 있어 분기처리하기 힘들다
```js
<FlatList 
    data={[
        {data1: 'a'}, 
        {data2: 'b'}, 
        {data3: 'c'}, 
        {data4: 'd'}, 
        {data5: 'e'}
    ]}
/>
```

SectionList의 경우 data를 다음처럼 전달할 수 있어 분기처리하기 좋다
```js
<SectionList 
    sections={[
        {
            title: 'A'
            data={[
                {data1: 'a'}, 
                {data2: 'b'}, 
                {data3: 'c'}, 
                {data4: 'd'}, 
                {data5: 'e'}
            ]}
        }, 
        {
            title: 'B'
            data={[
                {data1: 'a'}, 
                {data2: 'b'}, 
                {data3: 'c'}, 
                {data4: 'd'}, 
                {data5: 'e'}
            ]}
        }, 
        ...
    ]}
    renderSectionHeader={({title}) => <Text>{title}</Text>}
    renderItem={({item}) => <Text>{item.data1}</Text>}
/>
```
해당 data의 renderSection의 header부분은 renderSectionHeader를 통해서 추가 가능


## 2. SectionList의 refreshControl
```js
const [refreshing, setRefreshing] = useState(false)

const onRefresh = () => {
    setRefreshing(true);
}

useEffect(() => {
    if(refreshing){
        setTimeout(() => {
            // 실제 로직이라면 api refetch가 완료되는 순간 setRefreshing(false)
            setRefreshing(false)
        }, 3000)
    }
}, [refreshing])

...
<ScrollView
    refreshControl={
        <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    }
>
    <Text>Text..</Text>
</ScrollView>
```

