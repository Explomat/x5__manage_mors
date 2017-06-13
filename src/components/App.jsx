import React, { Component } from 'react';
import CheckBox from './modules/checkbox';
import { TextView, TextAreaView } from './modules/text-label';
import { ButtonPrimary } from './modules/button';
import { AlertDanger, AlertInfo } from './modules/alert';
import keys from 'lodash/keys';
import { post } from '../utils/ajax';
import { url } from '../config';

class App extends Component {

	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCloseError = this.handleCloseError.bind(this);
		this._isFieldsFilled = this._isFieldsFilled.bind(this);

		this.state = {
			error: '',
			message: '',
			isLoading: false,

			work_experience: {
				we__less_3_months: false,
				we__3_to_6_months: false,
				we__half_to_1_year: false,
				we__1_to_1_5_years: false,
				we__1_5_to_3_years: false,
				we__3_to_6_years: false,
				we__more_6_years: false
			},

			position: {
				position__cashier_seller: false,
				position__cashier_cook: false,
				position__cashier_baker: false,
				position__cashier_other: false
			},

			not_like: {
				nl__team_attitude: false,
				nl__payment: false,
				nl__disrespect: false,
				nl__living_conditions: false,
				nl__equipment: false,
				nl__organization: false,
				nl__long_to_go_work: false,
				nl__location: false,
				nl__schedule: false,
				nl__load: false,
				nl__reprocessing: false,
				nl__reprocessing_not_paid: false,
				nl__heavy: false,
				nl__low_salary: false,
				nl__conditions_salary: false,
				nl__buy_products: false,
				nl__not_in_time_payment: false,
				nl__social_package: false,
				nl__monotony: false,
				nl__not_independence: false,
				nl__not_career: false
			},

			time_to_work: {
				ttw__not_planned: false,
				ttw__more_than_month: false,
				ttw__in_month: false
			},

			leaving_company: '',

			return_to_company: {
				rtc__yes: false,
				rtc__yes_conditions: false,
				rtc__no: false
			},
			rtc__yes_conditions_text: '',

			fullname: '',

			shop_name: '',

			location: ''
		};
	}

	handleCloseError(){
		this.setState({ error: '' });
	}

	handleChange(group, key, val) {
		if (!group) {
			this.setState({ [key]: val });
		} else {
			const gr = this.state[group];
			const state = this.state;
			switch (group) {
				case 'work_experience': {
					for (const k in gr) {
						if (k === key) {
							gr[k] = val;
						} else {
							gr[k] = false;
						}
					}
					break;
				}
				case 'position': {
					for (const k in gr) {
						if (k === key) {
							gr[k] = val;
						} else {
							gr[k] = false;
						}
					}
					break;
				}
				case 'not_like': {
					const l =
						keys(this.state.not_like)
						.filter(k => state.not_like[k] === true)
						.length;
					for (const k in gr) {
						if (k === key && ((l === 3 && val === false) || l < 3)){
							gr[k] = val;
						}
					}
					break;
				}
				case 'time_to_work': {
					for (const k in gr) {
						if (k === key) {
							gr[k] = val;
						} else {
							gr[k] = false;
						}
					}
					break;
				}
				case 'return_to_company': {
					for (const k in gr) {
						if (k === key) {
							gr[k] = val;
						} else {
							gr[k] = false;
						}
					}
					break;
				}
				default:
					break;
			}
			this.setState({ [group]: gr });
		}
	}

	handleSubmit(e){
		e.preventDefault();
		if (!this._isFieldsFilled()){
			this.setState({ error: 'Поля, помеченные звездочкой* должны быть заполнены!' });
		} else {
			const form = this.refs.submitForm;
			const pdata = this._prepareDataBeforeRequest(this.state);
			this.setState({ isLoading: true });
			post(form.action, JSON.stringify(pdata))
			.then(res => JSON.parse(res))
			.then(data => {
				if (data.error){
					this.setState({
						isLoading: false,
						message: 'Произошла непредвиденна ошибка, обратитесь на study@x5.ru. \r\n' + data.error
					});
				} else {
					this.setState({
						isLoading: false,
						message: 'Спасибо за отзыв!'
					});
				}
			})
			.catch(err => {
				this.setState({
					isLoading: false,
					message: 'Произошла непредвиденна ошибка, обратитесь на study@x5.ru. \r\n' + err
				});
			});
		}
	}

	_prepareDataBeforeRequest(){
		const state = this.state;
		const data = {};
		keys(state).forEach(k => {
			const st = state[k];
			if (typeof st === 'object'){
				keys(st).forEach(s => {
					data[s] = st[s];
				});
			} else {
				data[k] = state[k];
			}
		});
		return data;
	}

	_isFieldsFilled(){
		const state = this.state;
		const returnToCompanyYesConditionsText =
			state.return_to_company.rtc__yes_conditions ?
			state.rtc__yes_conditions_text :
			true;


		const isTextFieldsFilled =
			state.fullname &&
			state.shop_name &&
			state.location &&
			returnToCompanyYesConditionsText;

		const isWorkExperienceGroupFilled =
			keys(state.work_experience)
			.filter(k => state.work_experience[k] === true)
			.length === 1;
		const isPositionGroupFilled =
			keys(state.position)
			.filter(k => state.position[k] === true)
			.length === 1;
		const isNotLikeGroupFilled =
			keys(state.not_like)
			.filter(k => state.not_like[k] === true)
			.length === 3;
		const isTimeToWorkGroupFilled =
			keys(state.time_to_work)
			.filter(k => state.time_to_work[k] === true)
			.length === 1;
		const isReturnToCompanyGroupFilled =
			keys(state.return_to_company)
			.filter(k => state.return_to_company[k] === true)
			.length === 1;

		return (
			isTextFieldsFilled &&
			isWorkExperienceGroupFilled &&
			isPositionGroupFilled &&
			isNotLikeGroupFilled &&
			isTimeToWorkGroupFilled &&
			isReturnToCompanyGroupFilled
		);
	}

	render(){
		const {
			error,
			message,
			isLoading,
			work_experience,
			position,
			not_like,
			time_to_work,
			leaving_company,
			return_to_company,
			rtc__yes_conditions_text,
			fullname,
			shop_name,
			location
		} = this.state;
		const loadingClasses = isLoading ?
			'overlay-loading overlay-loading--show body__loading' :
			'overlay-loading';
		return (
			<form ref='submitForm' action={url.createPath({ server_name: 'dismissal_form', action_name: 'Submit' })} onSubmit={this.handleSubmit}>
				<div className='dismissal-form'>
					<div className='header'>
						<div className='container'>
							<a className='clearfix header__link' href='/x5__dismissal_form/client/index.html'>
								<div className='logo' />
							</a>
						</div>
					</div>
					<div className='body'>
						<div className={loadingClasses} />
						{message ?
							<div className='container'>
								<AlertInfo isClose={false} text={message} />
							</div> :
							<div className='container'>
								<div className='body__title'>
									Уважаемый коллега! К сожалению, Вы покидаете нашу компанию.<br/><br/>
									Для улучшения условий работы компании просим Вас ответить на несколько вопросов анкеты, отметив<br/>
									подходящие для вас ответы, либо предложив свой вариант ответа. Данная анкета будет храниться
									в архиве и не<br/>подлежит разглашению.
								</div>
								<div className='body_paragraphs'>
									<div className='paragraph'>
										<div className='paragraph__title'>
											1. Ваш стаж на текущем месте работы на момент увольнения *
											(<em>выберите один вариант ответа</em>):
										</div>
										<div className='paragraph__body'>
											<CheckBox
												name='we__less_3_months'
												checked={work_experience.we__less_3_months}
												label='Менее 3х месяцев'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__less_3_months', val)}
											/>
											<CheckBox
												name='we__3_to_6_months'
												checked={work_experience.we__3_to_6_months}
												label='От 3х месяцев до полугода включительно'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__3_to_6_months', val)}
											/>
											<CheckBox
												name='we__half_to_1_year'
												checked={work_experience.we__half_to_1_year}
												label='От полугода до 1 года включительно'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__half_to_1_year', val)}
											/>
											<CheckBox
												name='we__1_to_1_5_years'
												checked={work_experience.we__1_to_1_5_years}
												label='От года до 1.5 лет включительно'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__1_to_1_5_years', val)}
											/>
											<CheckBox
												name='we__1_5_to_3_years'
												checked={work_experience.we__1_5_to_3_years}
												label='От 1.5 лет до 3 лет включительно'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__1_5_to_3_years', val)}
											/>
											<CheckBox
												name='we__3_to_6_years'
												checked={work_experience.we__3_to_6_years}
												label='От 3 до 6 лет включительно'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__3_to_6_years', val)}
											/>
											<CheckBox
												name='we__more_6_years'
												checked={work_experience.we__more_6_years}
												label='Более 6 лет'
												className='paragraph__control'
												onChange={val => this.handleChange('work_experience', 'we__more_6_years', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											2. Ваша должность * (<em>выберите один вариант ответа</em>):
										</div>
										<div className='paragraph__body'>
											<CheckBox
												name='position__cashier_seller'
												checked={position.position__cashier_seller}
												label='Кассир-продавец'
												className='paragraph__control'
												onChange={val => this.handleChange('position', 'position__cashier_seller', val)}
											/>
											<CheckBox
												name='position__cashier_cook'
												checked={position.position__cashier_cook}
												label='Повар'
												className='paragraph__control'
												onChange={val => this.handleChange('position', 'position__cashier_cook', val)}
											/>
											<CheckBox
												name='position__cashier_baker'
												checked={position.position__cashier_baker}
												label='Пекарь'
												className='paragraph__control'
												onChange={val => this.handleChange('position', 'position__cashier_baker', val)}
											/>
											<CheckBox
												name='position__cashier_other'
												checked={position.position__cashier_other}
												label='Другое'
												className='paragraph__control'
												onChange={val => this.handleChange('position', 'position__cashier_other', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											3. Отметьте, пожалуйста, галочкой 3 пункта, которые Вам&nbsp;*&nbsp;
											<u className='paragraph__accent'>больше всего НЕ</u> нравились в Компании:
										</div>
										<div className='paragraph__body'>
											<CheckBox
												name='nl__team_attitude'
												checked={not_like.nl__team_attitude}
												label='Отношения в коллективе'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__team_attitude', val)}
											/>
											<CheckBox
												name='nl__payment'
												checked={not_like.nl__payment}
												label='Несправедливая система оплаты труда'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__payment', val)}
											/>
											<CheckBox
												name='nl__disrespect'
												checked={not_like.nl__disrespect}
												label='Грубое, неуважительное отношение руководства магазина к персоналу'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__disrespect', val)}
											/>
											<CheckBox
												name='nl__living_conditions'
												checked={not_like.nl__living_conditions}
												label='Бытовые условия (холодно/жарко/не работает туалет и пр.)'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__living_conditions', val)}
											/>
											<CheckBox
												name='nl__equipment'
												checked={not_like.nl__equipment}
												label='Оборудование сильно устарело/его не хватает и пр.'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__equipment', val)}
											/>
											<CheckBox
												name='nl__organization'
												checked={not_like.nl__organization}
												label='Организация работы в магазине
													(перебрасывают из отдела в отдел, много недоделанных задач и пр.)'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__organization', val)}
											/>
											<CheckBox
												name='nl__long_to_go_work'
												checked={not_like.nl__long_to_go_work}
												label='Слишком долго добираться до работы'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__long_to_go_work', val)}
											/>
											<CheckBox
												name='nl__location'
												checked={not_like.nl__location}
												label='Магазин неудобно расположен, непросто добраться до работы'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__location', val)}
											/>
											<CheckBox
												name='nl__schedule'
												checked={not_like.nl__schedule}
												label='Неудобный график работы'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__schedule', val)}
											/>
											<CheckBox
												name='nl__load'
												checked={not_like.nl__load}
												label='Чрезмерная нагрузка/темп работы'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__load', val)}
											/>
											<CheckBox
												name='nl__reprocessing'
												checked={not_like.nl__reprocessing}
												label='Наличие переработок, даже если они оплачиваются'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__reprocessing', val)}
											/>
											<CheckBox
												name='nl__reprocessing_not_paid'
												checked={not_like.nl__reprocessing_not_paid}
												label='Переработки не оплачивается'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__reprocessing_not_paid', val)}
											/>
											<CheckBox
												name='nl__heavy'
												checked={not_like.nl__heavy}
												label='Физически тяжелая работа (приходится самим носить тяжести и пр.)'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__heavy', val)}
											/>
											<CheckBox
												name='nl__low_salary'
												checked={not_like.nl__low_salary}
												label='Размер зарплаты ниже, чем в аналогичных компаниях'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__low_salary', val)}
											/>
											<CheckBox
												name='nl__conditions_salary'
												checked={not_like.nl__conditions_salary}
												label='Непонятно, из чего складывается зарплата'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__conditions_salary', val)}
											/>
											<CheckBox
												name='nl__buy_products'
												checked={not_like.nl__buy_products}
												label='Сотрудников принуждают покупать товар
													(по акции на кассе/просроченный/платить за украденный)'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__buy_products', val)}
											/>
											<CheckBox
												name='nl__not_in_time_payment'
												checked={not_like.nl__not_in_time_payment}
												label='Несвоевременная/некорректная оплата труда'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__not_in_time_payment', val)}
											/>
											<CheckBox
												name='nl__social_package'
												checked={not_like.nl__social_package}
												label='Нет хорошего социального пакета'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__social_package', val)}
											/>
											<CheckBox
												name='nl__monotony'
												checked={not_like.nl__monotony}
												label='Однообразные рабочие задачи'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__monotony', val)}
											/>
											<CheckBox
												name='nl__not_independence'
												checked={not_like.nl__not_independence}
												label='Отсутствие полномочий и самостоятельности'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__not_independence', val)}
											/>
											<CheckBox
												name='nl__not_career'
												checked={not_like.nl__not_career}
												label='Отсутствие карьерного роста'
												className='paragraph__control'
												onChange={val => this.handleChange('not_like', 'nl__not_career', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											4. Через какое время вы планируете выйти на новую работу? *&nbsp;
											(<em>выберите один вариант ответа</em>)
										</div>
										<div className='paragraph__body'>
											<CheckBox
												name='ttw__not_planned'
												checked={time_to_work.ttw__not_planned}
												label='Не планирую в ближайшее время'
												className='paragraph__control'
												onChange={val => this.handleChange('time_to_work', 'ttw__not_planned', val)}
											/>
											<CheckBox
												name='ttw__more_than_month'
												checked={time_to_work.ttw__more_than_month}
												label='Через месяц и более'
												className='paragraph__control'
												onChange={val => this.handleChange('time_to_work', 'ttw__more_than_month', val)}
											/>
											<CheckBox
												name='ttw__in_month'
												checked={time_to_work.ttw__in_month}
												label='В течение месяца'
												className='paragraph__control'
												onChange={val => this.handleChange('time_to_work', 'ttw__in_month', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											5. Если у вас есть желание, опишите, пожалуйста, более подробно,
											почему вы уходите из Компании.
										</div>
										<div className='paragraph__body'>
											<TextAreaView
												name='leaving_company'
												value={leaving_company}
												onBlur={val => this.handleChange(null, 'leaving_company', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											6. Готовы ли Вы вернуться обратно в Компанию через некоторое время? *&nbsp;
											(<em>выберите один вариант ответа</em>)
										</div>
										<div className='paragraph__body'>
											<CheckBox
												name='rtc__yes'
												checked={return_to_company.rtc__yes}
												label='Да'
												className='paragraph__control'
												onChange={val => this.handleChange('return_to_company', 'rtc__yes', val)}
											/>
											<CheckBox
												name='rtc__yes_conditions'
												checked={return_to_company.rtc__yes_conditions}
												label='Да, при условии (впишите, пожалуйста, условие)'
												className='paragraph__control'
												onChange={val => this.handleChange('return_to_company', 'rtc__yes_conditions', val)}
											/>
											{
												return_to_company.rtc__yes_conditions &&
												<TextView
													name='rtc__yes_conditions_text'
													value={rtc__yes_conditions_text}
													onBlur={val => this.handleChange(null, 'rtc__yes_conditions_text', val)}
												/>
											}
											<CheckBox
												name='rtc__no'
												checked={return_to_company.rtc__no}
												label='Нет'
												className='paragraph__control'
												onChange={val => this.handleChange('return_to_company', 'rtc__no', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											7. Ваши ФИО *
										</div>
										<div className='paragraph__body'>
											<TextView
												name='fullname'
												value={fullname}
												onBlur={val => this.handleChange(null, 'fullname', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											8. Название магазина *
										</div>
										<div className='paragraph__body'>
											<TextView
												name='shop_name'
												value={shop_name}
												onBlur={val => this.handleChange(null, 'shop_name', val)}
											/>
										</div>
									</div>
									<div className='paragraph'>
										<div className='paragraph__title'>
											9. Название населенного пункта *
										</div>
										<div className='paragraph__body'>
											<TextView
												name='location'
												value={location}
												onBlur={val => this.handleChange(null, 'location', val)}
											/>
										</div>
									</div>
								</div>
							</div>
						}
					</div>
					{!message &&
						<div className='footer'>
							<div className='container'>
								{error && <AlertDanger text={error} onClose={this.handleCloseError}/>}
								<ButtonPrimary
									type='submit'
									text='Завершить заполнение'
									className='footer__submit-button'
								/>
							</div>
						</div>
					}
				</div>
			</form>
		);
	}
}

export default App;