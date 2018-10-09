import React from 'react';
import { shallow } from 'enzyme';
import FormAddWord from './component';
import loadingNames  from '../../constants/loading-names';

describe('Form add word', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <FormAddWord
        onAddNewExample={() => {}}
        onRemoveExample={() => {}}
        onExampleChange={() => {}}
        onFormItemChange={() => {}}
        saveWord={() => {}}
        onResetForm={() => {}}
      />
    );
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('onChange english', () => {
    const nodeTest = wrapper.findWhere(node => node.props().label === 'English');

    nodeTest.simulate('change');
    expect(wrapper).toMatchSnapshot();
  });

  test('onChange russian', () => {
    const nodeTest = wrapper.findWhere(node => node.props().label === 'Russian');

    nodeTest.simulate('change');
    expect(wrapper).toMatchSnapshot();
  });

  test('onChange transcription', () => {
    const nodeTest = wrapper.findWhere(node => node.props().label === 'Transcription');

    nodeTest.simulate('change');
    expect(wrapper).toMatchSnapshot();
  });

  test('Loading', () => {
    wrapper.setProps({
      currentLoadingNames: [loadingNames.saveWord],
    });
    expect(wrapper).toMatchSnapshot();
  });

  test('examples', () => {
    wrapper.setProps({
      form: {
        examples: [{
          value: 'example',
          id: 'id',
        }],
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  test('example on Change', () => {
    const onExampleChange = jest.fn();

    wrapper.setProps({
      form: {
        examples: [{
          value: 'example',
          id: 'id',
        }],
      },
      onExampleChange,
    });
    const nodeTest = wrapper.findWhere(node => node.props().label === 'Example').first();

    nodeTest.simulate('change');
    expect(onExampleChange).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

});
