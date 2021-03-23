import { useEffect } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { LayoutScroll } from '../components/LayoutScroll';

import '../example/template/scroll-example.css';

export default {
  title: 'Page/behavior-Layout',
  component: LayoutScroll,
} as Meta;

const callString = async () => {
  return await import('../example/template/scroll.js');
}

const Template: Story = (arg) => {
  const name = arg.type;
  let magicObj;
  useEffect(() => {  
    callString().then(r => {      
      try {
        document.querySelector('#section-wipes').innerHTML = r[name];
        console.log(name)
        magicObj = r[`${name}_f`]();
        
      } catch (error) {
        console.log(error)
      }
    });
    return () => {
      // reset 
      magicObj.controller.destroy(true);
      magicObj.scene.forEach(v => v.destroy(true));
      magicObj = null;
    }
  }, [arg]);

  return (
    <div id="example-wrapper">
      <div className='scrollContent'>
        <section className="demo" id="section-wipes">
            wait
        </section>
        </div>
    </div>
  )
};

export const 스크롤_레이아웃 = Template.bind({});
스크롤_레이아웃.args = {
  type: 'section_wipes_natural'
}
스크롤_레이아웃.argTypes = {
    type: {
      control: {
        type: 'select',
        options: ['section_wipes_natural', 'animating_with_GSAP', 'section_slides'],
      },
    }
}
  
