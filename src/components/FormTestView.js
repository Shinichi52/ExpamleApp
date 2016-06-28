import React, {
  Text,
} from 'react-native';

class FormTestView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let message = `Hello, ${this.props.name}!`;
    return (
      <Text>{message}</Text>
    );
  }

}

module.exports = FormTestView;
