import { defineComponent, Prop, PropType, Ref } from 'vue';
// import { Props } from '@/template/component'

interface MProps {
    day: Array<number>;
}
interface MData {
    name: string;
    day?: Ref<Array<number>>;
}

/**
 * @description The first signature, the function accepts a setup function.
 * @type
 */
export const Component1 = defineComponent<MProps, MData>(function setup(
    props,
    content
) {
    console.log(props, content);
    return {
        name: '1'
    };
});

/**
 * @description When accepting object definition components, three props are accepted.
 *  It cannot be restricted by defining generic parameters, it must be deduced by the props attribute.
 * @param { ComponentOptionsWithObjectProps
 *  | ComponentOptionsWithArrayProps
 *  | ComponentOptionsWithObjectProps } options
 *
 */
export const Component2 = defineComponent({
    props: undefined,
    setup(props, content): MData {
        console.log(props, content);
        return {
            name: '1'
        };
    }
});

export const Component3 = defineComponent({
    props: ['day'],
    setup(props, content): JSX.Element {
        console.log(props, content);
        return <div>{props.day}</div>;
    }
});

interface Period {
    morning: number;
    afternoon: number;
    evening: number;
}

export const Component4 = defineComponent({
    props: {
        period: {
            type: Object as PropType<Period>
        },
        day: {
            type: Array,
            required: true,
            default: function() {
                return [0, 1, 2, 3, 4, 5, 6];
            },
            validator: (day: Array<number>) => {
                console.log(day);
                return true;
            }
        } as Prop<Array<number>>
    },
    setup(props) {
        return (
            <div>
                {props.day}
                {props.period?.afternoon}
            </div>
        );
    }
});
