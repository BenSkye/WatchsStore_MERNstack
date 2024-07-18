import React, { useEffect, useState } from 'react';
import { getWatchAPI, getWatchQueryAPI } from '../../service/watchAPI/watchAPI';
import WatchCard from './components/watchCard';
import { Button, Col, Form, Input, Row, Select } from 'antd';
const { Option } = Select;
export default function Home() {
  const [listWatch, setListWatch] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [watchName, setWatchName] = useState('');
  const [brandId, setBrandId] = useState('');
  const getWatch = async () => {
    const respone = await getWatchQueryAPI(watchName, brandId);
    console.log('respone', respone.data);
    setListWatch(respone?.data.watches);
    setListBrand(respone?.data.brands);
  };

  useEffect(() => {
    getWatch();
  }, []);

  useEffect(() => {
    console.log('listWatch', listWatch);
  }, [listWatch]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setBrandId(value);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const handleSearchbyWatchName = async (values) => {
    console.log('watchName', values.watchName);
    setWatchName(values.watchName);
  };
  useEffect(() => {
    getWatch();
  }, [watchName, brandId]);

  return (
    <div>
      <Row
        justify='center'
        align='middle'
        style={{ padding: '20px' }}
        gutter={[16, 16]}
      >
        <Form layout='vertical' onFinish={handleSearchbyWatchName}>
          <Form.Item
            label='Watch Name'
            name='watchName'
            style={{ flexGrow: 1, justifyContent: 'start' }}
          >
            <Input
              placeholder='Enter watch name'
              style={{ width: '200px', margin: '0.1rem' }}
            />
            <Button type='primary' htmlType='submit' style={{ width: '60px' }}>
              Search
            </Button>
            <Select
              showSearch
              placeholder='Select a brand'
              optionFilterProp='children'
              onChange={onChange}
              onSearch={onSearch}
              style={{ width: '150px', paddingLeft: '1.2rem' }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value=''>All</Option>
              {listBrand.map((brand) => (
                <Option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Row>
      <Row gutter={[16, 16]}>
        {listWatch.map((watch) => (
          <Col className='gutter-row' span={6} key={watch._id}>
            <WatchCard watch={watch} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
