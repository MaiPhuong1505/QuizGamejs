import { InputLabel, ListItemText, MenuItem, Select, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { categoryServices } from '../../services/categoryServices';
import { useSelector } from 'react-redux';

const CategorySelect = ({ getData, categoryId }) => {
  const { user } = useSelector((state) => state);

  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const [categoryList, setCategoryList] = useState([]);

  const getCategories = async (token) => {
    try {
      const response = await categoryServices.getCategories(token);
      console.log('response', response);
      const categories = response.data.categories;
      if (categories) {
        //display 'Other' category in the last of list
        const otherIndex = categories.indexOf('Other');
        if (otherIndex !== -1) {
          const other = categories.splice(otherIndex, 1);
          categories.push(other[0]);
        }
        setCategoryList(categories);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCategories(user.token);
  }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    getData(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel id="category-select"></InputLabel>
        {categoryList.length > 0 && (
          <Select
            sx={{ width: '100%' }}
            labelId="category-select"
            id="category-select"
            size="small"
            value={selectedCategory || ''}
            onChange={handleChange}
            label=""
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
