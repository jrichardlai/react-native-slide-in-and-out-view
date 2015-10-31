'use strict';

import React from 'react-native';

const {
  Animated,
  View,
  Easing,
} = React;

class SlideInAndOutView extends React.Component {
  constructor(props) {
    super(props);

    this.handleChildrenLayout = this.handleChildrenLayout.bind(this);
    this.slideOut             = this.slideOut.bind(this);

    this.state = {
      height: new Animated.Value(0),
    };

  }

  slideOut(callback) {
    const endCallback = ({value}) => {
      if (value === 0) { callback(); }
      this.state.height.removeListener(endCallback);
    };

    this.state.height.addListener(endCallback);

    Animated.timing(this.state.height, {
      toValue: 0,
      easing: Easing.easeOutQuad,
    }, callback).start();
  }

  handleChildrenLayout(event) {
    Animated.timing(this.state.height, {toValue: Math.round(event.nativeEvent.layout.height)}).start();
  }

  render() {
    return (
      <Animated.View
        style={{height: this.state.height}}
      >
        <View
          onLayout={this.handleChildrenLayout}
          children={this.props.children}
          slideOut={this.slideOut}
        />
      </Animated.View>
    );
  }
}

export default SlideInAndOutView;
