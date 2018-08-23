# d3-narrative-visualization
The data here from Zillow captures the Home Sales and Rental data(Multifamily condo) for 5 states for the last 10 years. 

These are the top 5 states excluding NewYork and Texas as data was not complete. This visualization helps us identify how the housing market is grown in different states. The data was messaged with JavaScript generating a JSON and CSV as input for D3 for 3 types of visuals(Line,Pie and Stacked) 

This is a Bootstrap-D3 App running on heroku depicting a Martini Glass visualization

Its Martini glass because the stacked graph on the right showing data from 2008-2017 is static author driven content providing a broader context and the linechart and PieChart shows interactive user content, which user can choose to interact on his own. The Linechart provides further introspection with a timeline control at the bottom. 

There are scenes for Sales and Rent history with Parameters and Annotations. The scenes provide a comparison of how the rental market is in comparision to owners. 

The Annotations show the price of each month for both categories. The axis are labeled and adjust automatically to the scene type. 

The triggers are timeline-sliders adjusting date ranges and dropdowns for each state. The dropdowns for states switches between top 5 states. The drop-down acts as a trigger for rent and sales. Also clicking on the pie chart will switch between the states when user chooses a scene.
