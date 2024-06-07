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
