//
//  <%= projectName %>.swift
//  <%= projectName %>
//
//  Copyright © 2015 <%= organizationName %>. All rights reserved.
//

import UIKit

public class <%= projectName %> {
    
    // MARK: Internal Properties
    
    var someProperty: String
    
    // MARK: APIs
    
    public func hello() -> String {
        return someProperty
    }
    
    // MARK: Initilizers
    
    public init() {
        someProperty = "a string"
    }
}


