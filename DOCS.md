<a name="Satispay"></a>

## Satispay
Class Satispay

**Kind**: global class  

* [Satispay](#Satispay)
    * [new Satispay(bearerToken)](#new_Satispay_new)
    * [.createUser(options)](#Satispay+createUser) ⇒ <code>Promise</code>
    * [.getUserList(options)](#Satispay+getUserList) ⇒
    * [.getUser(options)](#Satispay+getUser)
    * [.createCharge(options)](#Satispay+createCharge)
    * [.getChargeList(options)](#Satispay+getChargeList)
    * [.getCharge(options)](#Satispay+getCharge)
    * [.updateCharge(options)](#Satispay+updateCharge)
    * [.createRefund(options)](#Satispay+createRefund)
    * [.getRefund(options)](#Satispay+getRefund)
    * [.getRefundList(options)](#Satispay+getRefundList)
    * [.updateRefund(options)](#Satispay+updateRefund)
    * [.getAmount(options)](#Satispay+getAmount)

<a name="new_Satispay_new"></a>

### new Satispay(bearerToken)

| Param | Description |
| --- | --- |
| bearerToken | merchant bearer token |

<a name="Satispay+createUser"></a>

### satispay.createUser(options) ⇒ <code>Promise</code>
Create User create a user you want to send Charge request to. The user must be subscribed to satispay service.
Once you create a user you do not need to create it again but it is enough create a Charge with the user id used previously.
But don’t worry, if you do not store user id you can call again the Create a user and, for the same phone number, it will always return the same user id.

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  
**Returns**: <code>Promise</code> - promise resolve true or error  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options object |
| options.idempotencyKey | <code>string</code> | The idempotency key |
| options.phone | <code>string</code> |  |

<a name="Satispay+getUserList"></a>

### satispay.getUserList(options) ⇒
Get the list of Shop Users of a Online shop

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  
**Returns**: user list array  

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| options.starting_after | <code>String</code> | user id |
| options.ending_before | <code>String</code> | user id |
| options.limit | <code>String</code> | Default 20, max_value = 100, min_value = 1 |

<a name="Satispay+getUser"></a>

### satispay.getUser(options)
Get an user by id, by the way the only new information returned from this call is the user phone_number.

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| options.id | <code>String</code> | The user's id |

<a name="Satispay+createCharge"></a>

### satispay.createCharge(options)
Create charge

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| options.idempotencyKey | <code>String</code> | Idempotency key |
| options.skipPush | <code>Boolean</code> | Skip push notification |
| options.user_id | <code>String</code> | User's id |
| options.description | <code>String</code> | Charge description |
| options.amount | <code>Number</code> | Charge amount |
| options.required_success_email | <code>Boolean</code> | Succes email |
| options.metadata | <code>String</code> | Charge metadata |
| options.expire_in | <code>Number</code> | Time to expire charge request |
| options.callback_url | <code>String</code> | callback url |

<a name="Satispay+getChargeList"></a>

### satispay.getChargeList(options)
Get charge list

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.starting_after_timestamp | 
| options.starting_after | 
| options.ending_before | 
| options.limit | 

<a name="Satispay+getCharge"></a>

### satispay.getCharge(options)
Get charge

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.id | 

<a name="Satispay+updateCharge"></a>

### satispay.updateCharge(options)
Update charge

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.id | 
| options.metadata | 
| options.description | 
| options.charge_state | 

<a name="Satispay+createRefund"></a>

### satispay.createRefund(options)
Create refund

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.charge_id | 
| options.description | 
| options.currency | 
| options.amount | 
| options.metadata | 
| options.reason | 

<a name="Satispay+getRefund"></a>

### satispay.getRefund(options)
Get refund

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.id | 

<a name="Satispay+getRefundList"></a>

### satispay.getRefundList(options)
Get refund list

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.starting_after | 
| options.ending_before | 
| options.limit | 
| options.charge_id | 

<a name="Satispay+updateRefund"></a>

### satispay.updateRefund(options)
Update refund

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.metadata | 

<a name="Satispay+getAmount"></a>

### satispay.getAmount(options)
Get amount

**Kind**: instance method of [<code>Satispay</code>](#Satispay)  

| Param |
| --- |
| options | 
| options.starting_date | 
| options.ending_date | 

