import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { Fragment } from 'react'

const FormItem = Form.Item


class Tax extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            income: 0
        }
    }

    handleSubmit = () => {
        const form = this.props.form
        form.validateFields((err, fieldsValue) => {
            if (!err) {
                try {
                    let gongzi = Number(fieldsValue['salary'])
                    let qizheng = 5000
                    let shebao = Number(fieldsValue['shebao'])
                    let gongjijin = Number(fieldsValue['gongjijin'])
                    let gongjijin_rate = Number(fieldsValue['gongjijin_rate'])
                    if (isNaN(gongzi) || isNaN(qizheng) || isNaN(shebao) || isNaN(gongjijin) || isNaN(gongjijin_rate)){
                        message.error('不要输入非法数字哦')
                        return
                    }

                    const income_bt = gongzi - (shebao * 0.105) - gongjijin * gongjijin_rate / 100 - qizheng
                    let income
                    const tax_rates = [[3000, 3, 0], [12000, 10, 210], [25000, 20, 1410], [35000, 25, 2660], [55000, 30, 4410], [80000, 35, 7160], [0, 45, 15160]]
                    if (income_bt > 0){
                        var tidx = 0
                        for (let i=0; i < tax_rates.length; i++){
                            if (income_bt < tax_rates[i][0]){
                                tidx = i
                                break
                            }
                            if ( i === tax_rates.length - 1){
                                tidx = i
                            }
                        }
console.log(income_bt, tidx)
                        income = income_bt * (1 - tax_rates[tidx][1]/100) + tax_rates[tidx][2] +qizheng
                    } else {
                        income = income_bt
                    }
                    this.setState({
                        income
                    })
                } catch(e) {
                    message.error('不要输入非法数字哦')
                }
            }
        })
    }

    render() {
        const itemLayout = {
            labelCol: {
                span: 8,
                sm: {span: 2},
            },
            wrapperCol: {
                sm: {span: 3},
                span: 12,
            }
        }

        const itemLayoutnl = {
            wrapperCol: {
                span: 8,
                offset: 12,
                sm: {span: 2, offset: 3}
            }
        }

        const form = this.props.form
        return (
            <Fragment>
                <Form hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...itemLayout} label="工资">
                        {form.getFieldDecorator('salary', {
                            rules: [{ required: true, message: '必填' }],
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...itemLayout} label="社保基数">
                        {form.getFieldDecorator('shebao', {
                            rules: [{ required: true, message: '必填' }],
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...itemLayout} label="公积金基数">
                        {form.getFieldDecorator('gongjijin', {
                            rules: [{ required: true, message: '必填' }],
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...itemLayout} label="公积金比例">
                        {form.getFieldDecorator('gongjijin_rate', {
                            rules: [{ required: true, message: '必填' }],
                            initialValue: 8
                        })(<Input placeholder="请输入" addonAfter={'%'}/>)}
                    </FormItem>
                    <FormItem {...itemLayout} label="税后收入">
                        <label>{this.state.income}</label>
                    </FormItem>
                    <FormItem {...itemLayoutnl}>
                        <Button style={{width: '100%'}} onClick={this.handleSubmit}>计算</Button>
                    </FormItem>
                </Form>
                
            </Fragment>
        )
    }
}

export default Form.create()(Tax)
