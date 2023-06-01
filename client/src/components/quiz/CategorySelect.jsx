import { InputLabel, ListItemText, MenuItem, Select, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CategorySelect = ({ getData, categoryId }) => {
  const initList = [
    { _id: '646eccb1d932a3a34d3dd36f', categoryName: 'Math' },
    { _id: '646ecce4d932a3a34d3dd370', categoryName: 'IT' },
    { _id: '646eccfdd932a3a34d3dd371', categoryName: 'History' },
    { _id: '646ecd0bd932a3a34d3dd372', categoryName: 'Literature' },
    { _id: '646ecd1ad932a3a34d3dd373', categoryName: 'English' },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [categoryList, setCategoryList] = useState(initList);

  // const getFoodCategories = async (token) => {
  //   const response = await storeServices.getFoodCategories(token)
  //   if (response.data) {
  //     setCategoryList(response.data)
  //   }
  // }
  // useEffect(() => {
  //   getFoodCategories(token)
  // }, [])

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    getData(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel id="demo-select-small">Danh mục</InputLabel>
        {categoryList.length > 0 && (
          <Select
            sx={{ width: '100%' }}
            labelId="demo-select-small"
            id="demo-select-small"
            size="small"
            value={selectedCategory || ''}
            onChange={handleChange}
            label={'Danh mục'}
          >
            {categoryList.map((value) => (
              <MenuItem key={value._id} value={value._id}>
                {value.categoryName}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </>
  );
};

export default CategorySelect;
